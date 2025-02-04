import { Button } from '@/components/ui';
import confetti from 'canvas-confetti';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
export default function FinishForm() {
  const handleShowConfetti = () => {
    const end = Date.now() + 1 * 1000; // 1 seconds
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];

    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 1,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 1,
        angle: 120,
        spread: 80,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };
  const [pending, start] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      handleShowConfetti();
    }, 1);
  }, []);

  return (
    <div className="mt-4 space-y-3">
      <div className="relative flex overflow-hidden justify-center items-center aspect-video border rounded-xl border-gray-300 dark:border-gray-800 ">
        <Image
          src="/dashboard-screenshot-mockup.png"
          alt="Dashboard screenshot mockup"
          priority
          fill
        />
      </div>

      <div className="mt-6 grid space-y-3">
        <Button
          type="submit"
          onClick={() => {
            start(() => router.push('/dashboard'));
          }}
          isLoading={pending}
        >
          Finish up
        </Button>
      </div>
    </div>
  );
}
