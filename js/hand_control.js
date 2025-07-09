// Sistem kontrol tangan masih dummy, nanti bisa dikembangkan gesture
export const handState = {
  isGrabbing: false,
};

export function toggleGrab() {
  handState.isGrabbing = !handState.isGrabbing;
  console.log("Tangan:", handState.isGrabbing ? "Genggam" : "Lepas");
}
