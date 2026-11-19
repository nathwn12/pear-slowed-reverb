import { injectCpuTamerByAnimationFrame } from './cpu-tamer-by-animationframe';
import { injectCpuTamerByDomMutation } from './cpu-tamer-by-dom-mutation';

const isGPUAccelerationAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
};

export const injectCpuTamer = () => {
  if (isGPUAccelerationAvailable()) {
    injectCpuTamerByAnimationFrame(null);
  } else {
    injectCpuTamerByDomMutation(null);
  }
};
