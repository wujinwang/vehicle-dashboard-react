
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-green-600 text-gray-50 hover:bg-green-700',
                destructive: 'bg-red-500 text-gray-50 hover:bg-red-500/90',
                outline:
                    'border border-gray-200 00 bg-white hover:bg-gray-100 hover:text-gray-900',
                secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-100/80',
                ghost: 'hover:bg-gray-100 hover:text-gray-900',
                link: 'text-gray-900 underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2 text-md ',
                sm: 'h-8 rounded px-3 text-sm ',
                lg: 'h-11 rounded-md px-8 text-md ',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        //const Comp = asChild ? Slot : 'button';
        const Comp = 'button';
        return (
            <Comp
                className={buttonVariants({ variant, size, className })}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
