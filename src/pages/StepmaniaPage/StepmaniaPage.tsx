import { useEffect, useRef, useState } from 'react';
import './StepmaniaPage.scss';
import arrows from 'assets/img/arrows.png';

const StepmaniaPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        function drawImageActualSize(this: GlobalEventHandlers, ev: Event) {
          canvas.width = canvas?.clientWidth;
          canvas.height = canvas?.clientHeight;

          // draw the crop image
          ctx.drawImage(this, 20, 0, this.width / 2 - 20, this.height, 0, 0, this.width / 2 - 20, this.height);
        }

        const image = new Image(); // Using optional size for image
        image.onload = drawImageActualSize; // Draw when image has loaded

        // Load an image of intrinsic size 300x227 in CSS pixels
        image.src = arrows;
      }
    }
  }, []);

  return (
    <div className="container">
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default StepmaniaPage;
