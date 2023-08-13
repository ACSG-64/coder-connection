import { cn } from '@/lib/utils'
import React from 'react'

// Heading 1
export const H1 = ({
    className,
    children,
    ...rest
}: React.HTMLProps<HTMLHeadingElement>) => {
    return (
        <h1
            className={cn(
                'scroll-m-20 text-5xl font-semibold tracking-tight lg:text-6xl',
                className
            )}
            {...rest}
        >
            {children}
        </h1>
    )
}

// Heading 2
export const H2 = ({
    className,
    children,
    ...rest
}: React.HTMLProps<HTMLHeadingElement>) => {
    return (
        <h2
            className={cn(
                'scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl',
                className
            )}
            {...rest}
        >
            {children}
        </h2>
    )
}

// Heading 3
export const H3 = ({
    className,
    children,
    ...rest
}: React.HTMLProps<HTMLHeadingElement>) => {
    return (
        <h3
            className={cn(
                'scroll-m-20 text-3xl font-medium tracking-tight lg:text-4xl',
                className
            )}
            {...rest}
        >
            {children}
        </h3>
    )
}

// Heading 4
export const H4 = ({
    className,
    children,
    ...rest
}: React.HTMLProps<HTMLHeadingElement>) => {
    return (
        <h4
            className={cn(
                'scroll-m-20 text-2xl font-medium tracking-tight lg:text-3xl',
                className
            )}
            {...rest}
        >
            {children}
        </h4>
    )
}

// Heading 5
export const H5 = ({
    className,
    children,
    ...rest
}: React.HTMLProps<HTMLHeadingElement>) => {
    return (
        <h5
            className={cn(
                'scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl',
                className
            )}
            {...rest}
        >
            {children}
        </h5>
    )
}

// paragraph
export const Paragraph = ({
    className,
    children,
    ...rest
}: React.HTMLProps<HTMLParagraphElement>) => {
    return (
        <p
            className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
            {...rest}
        >
            {children}
        </p>
    )
}

// small paragraph
export const Small = ({
    className,
    children,
    ...rest
}: React.HTMLProps<HTMLSpanElement>) => {
    return (
        <small
            className={cn('text-sm font-medium leading-none', className)}
            {...rest}
        >
            {children}
        </small>
    )
}

// Large paragraph
export const Large = ({
    className,
    children,
    ...rest
}: React.HTMLProps<HTMLDivElement>) => {
    return (
        <div className={cn('text-lg font-normal', className)} {...rest}>
            {children}
        </div>
    )
}
