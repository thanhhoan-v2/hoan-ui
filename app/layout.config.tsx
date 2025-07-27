import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <svg aria-label='Logo' height='24' width='24' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
          <title>Hoan UI</title>
          <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/>
        </svg>
        Hoan UI
      </>
    ),
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  // links: [
  //   {
  //     text: 'Documentation',
  //     url: '/docs',
  //   },
  // ],
};
