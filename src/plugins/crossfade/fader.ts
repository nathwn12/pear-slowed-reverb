/**
 * VolumeFader
 * Sophisticated Media Volume Fading
 *
 * Requires browser support for:
 * - HTMLMediaElement
 * - requestAnimationFrame()
 * - ES6
 *
 * Does not depend on any third-party library.
 *
 * License: MIT
 *
 * Nick Schwarzenberg
 * v0.2.0, 07/2016
 */

const validateVolumeLevel = (value: number) => {
  if (!Number.isNaN(value) && value >= 0 && value <= 1) {
  } else {
    throw new TypeError('Number between 0 and 1 expected as volume!');
  }
};

type VolumeLogger = <Params extends unknown[]>(
  message: string,
  ...args: Params
) => void;
interface VolumeFaderOptions {
  /**
   * logging `function(stuff, …)` for execution information (default: no logging)
   */
  logger?: VolumeLogger;
  /**
   * either 'linear', 'logarithmic' or a positive number in dB (default: logarithmic)
   */
  fadeScaling?: string | number;
  /**
   * media volume 0…1 to apply during setup (volume not touched by default)
   */
  initialVolume?: number;
  /**
   * time in milliseconds to complete a fade (default: 1000 ms)
   */
  fadeDuration?: number;
}

interface VolumeFade {
  volume: {
    start: number;
    end: number;
  };
  time: {
    start: number;
    end: number;
  };
  callback?: () => void;
}

export class VolumeFader {
  private readonly media: HTMLMediaElement;
  private readonly logger: VolumeLogger | null;
  private scale: {
    internalToVolume: (level: number) => number;
    volumeToInternal: (level: number) => number;
  };
  private fadeDuration: number = 1000;
  private active: boolean = false;
  private fade: VolumeFade | undefined;

  /**
   * VolumeFader Constructor
   *
   * @param media {HTMLMediaElement} - audio or video element to be controlled
   * @param options {Object} - an object with optional settings
   * @throws {TypeError} if options.initialVolume or options.fadeDuration are invalid
   *
   */
  constructor(media: HTMLMediaElement, options: VolumeFaderOptions) {
    if (media instanceof HTMLMediaElement) {
      this.media = media;
    } else {
      throw new TypeError('Media element expected!');
    }

    options = options || {};

    if (typeof options.logger === 'function') {
      this.logger = options.logger;
    } else {
      this.logger = null;
    }

    if (options.fadeScaling === 'linear') {
      this.scale = {
        internalToVolume: (level: number) => level,
        volumeToInternal: (level: number) => level,
      };

      this.logger?.('Using linear fading.');
    } else {
      let dynamicRange: number;

      if (
        options.fadeScaling === undefined ||
        options.fadeScaling === 'logarithmic'
      ) {
        dynamicRange = 3;
      } else if (
        typeof options.fadeScaling === 'number' &&
        !Number.isNaN(options.fadeScaling) &&
        options.fadeScaling > 0
      ) {
        dynamicRange = options.fadeScaling / 2 / 10;
      } else {
        throw new TypeError(
          "Expected 'linear', 'logarithmic' or a positive number as fade scaling preference!",
        );
      }

      this.scale = {
        internalToVolume: (level: number) =>
          this.exponentialScaler(level, dynamicRange),
        volumeToInternal: (level: number) =>
          this.logarithmicScaler(level, dynamicRange),
      };

      if (options.fadeScaling)
        this.logger?.(
          'Using logarithmic fading with ' +
            String(10 * dynamicRange) +
            ' dB dynamic range.',
        );
    }

    if (options.initialVolume !== undefined) {
      validateVolumeLevel(options.initialVolume);

      this.media.volume = options.initialVolume;

      this.logger?.('Set initial volume to ' + String(this.media.volume) + '.');
    }

    if (options.fadeDuration === undefined) {
      this.fadeDuration = 1000;
    } else {
      this.setFadeDuration(options.fadeDuration);
    }

    this.active = false;

    this.logger?.('Initialized for', this.media);
  }

  /**
   * Re(start) the update cycle.
   * (this.active must be truthy for volume updates to take effect)
   *
   * @return {Object} VolumeFader instance for chaining
   */
  start() {
    this.active = true;

    this.updateVolume();

    return this;
  }

  /**
   * Stop the update cycle.
   * (interrupting any fade)
   *
   * @return {Object} VolumeFader instance for chaining
   */
  stop() {
    this.active = false;

    return this;
  }

  /**
   * Set fade duration.
   * (used for future calls to fadeTo)
   *
   * @param {Number} fadeDuration - fading length in milliseconds
   * @throws {TypeError} if fadeDuration is not a number greater than zero
   * @return {Object} VolumeFader instance for chaining
   */
  setFadeDuration(fadeDuration: number) {
    if (!Number.isNaN(fadeDuration) && fadeDuration > 0) {
      this.fadeDuration = fadeDuration;

      this.logger?.('Set fade duration to ' + String(fadeDuration) + ' ms.');
    } else {
      throw new TypeError('Positive number expected as fade duration!');
    }

    return this;
  }

  /**
   * Define a new fade and start fading.
   *
   * @param {Number} targetVolume - level to fade to in the range 0…1
   * @param {Function} callback - (optional) function to be called when fade is complete
   * @throws {TypeError} if targetVolume is not in the range 0…1
   * @return {Object} VolumeFader instance for chaining
   */
  fadeTo(targetVolume: number, callback?: () => void) {
    validateVolumeLevel(targetVolume);

    this.fade = {
      volume: {
        start: this.scale.volumeToInternal(this.media.volume),
        end: this.scale.volumeToInternal(targetVolume),
      },
      time: {
        start: Date.now(),
        end: Date.now() + this.fadeDuration,
      },
      callback,
    };

    this.start();

    this.logger?.('New fade started:', this.fade);

    return this;
  }

  fadeIn(callback: () => void) {
    this.fadeTo(1, callback);
  }

  fadeOut(callback: () => void) {
    this.fadeTo(0, callback);
  }

  /**
   * Internal: Update media volume.
   * (calls itself through requestAnimationFrame)
   */
  updateVolume() {
    if (this.active && this.fade) {
      const now = Date.now();

      if (now < this.fade.time.end) {
        const progress =
          (now - this.fade.time.start) /
          (this.fade.time.end - this.fade.time.start);

        const level =
          progress * (this.fade.volume.end - this.fade.volume.start) +
          this.fade.volume.start;

        this.media.volume = this.scale.internalToVolume(level);

        window.requestAnimationFrame(this.updateVolume.bind(this));
      } else {
        this.logger?.('Fade to ' + String(this.fade.volume.end) + ' complete.');

        this.media.volume = this.scale.internalToVolume(this.fade.volume.end);

        this.active = false;

        if (typeof this.fade.callback === 'function') this.fade.callback();

        this.fade = undefined;
      }
    }
  }

  /**
   * Internal: Exponential scaler with dynamic range limit.
   *
   * @param {Number} input - logarithmic input level to be expanded (float, 0…1)
   * @param {Number} dynamicRange - expanded output range, in multiples of 10 dB (float, 0…∞)
   * @return {Number} - expanded level (float, 0…1)
   */
  exponentialScaler(input: number, dynamicRange: number) {
    if (input === 0) {
      return 0;
    }

    input = (input - 1) * dynamicRange;

    return 10 ** input;
  }

  /**
   * Internal: Logarithmic scaler with dynamic range limit.
   *
   * @param {Number} input - exponential input level to be compressed (float, 0…1)
   * @param {Number} dynamicRange - coerced input range, in multiples of 10 dB (float, 0…∞)
   * @return {Number} - compressed level (float, 0…1)
   */
  logarithmicScaler(input: number, dynamicRange: number) {
    if (input === 0) {
      return 0;
    }

    input = Math.log10(input);

    return Math.max(1 + input / dynamicRange, 0);
  }
}

export default {
  VolumeFader,
};
