import Link from 'next/link'
import { useRef } from 'react'

interface ButtonProps {
  title: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  disable?: boolean
  loading?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
};

const Button = ({
  title,
  href,
  onClick,
  variant = 'primary',
  disable= false,
  loading= false,
  className,
  type='button' 
}: ButtonProps) => {
  const isThrottled = useRef(false);

  const handleClick = () => {
    if(isThrottled.current || disable || loading) return;

    isThrottled.current = true;

    onClick?.();

    setTimeout(() => { isThrottled.current = false }, 1000);
  }

  return (
    <div>
        <button className="bg-black/90 text-xs text-accent-foreground font-medium px-3.5 py-2.5 rounded-sm uppercase">
            <Link href={"/"}/>
            <p>{title}</p>
        </button>
    </div>
  )
}

export default Button