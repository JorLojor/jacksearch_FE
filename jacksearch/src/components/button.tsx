import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils"; // pastikan cn sudah terdefinisi di file utils

// Variants untuk button
const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				outline:
					"border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-12 px-6 py-3 text-lg",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

// Button component
type ButtonProps = React.HTMLAttributes<HTMLElement> & {
	className?: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	size?: "default" | "sm" | "lg" | "icon";
	asChild?: boolean;
};

const Button = React.forwardRef<HTMLElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		// Menentukan tag yang akan digunakan (button atau div)
		const Comp: React.ElementType = asChild ? "div" : "button";

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref as React.Ref<any>}
				{...props} // Spread semua props agar bisa diterima oleh button atau div
			/>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonVariants };
