export default {
  breakpoints: [],
  space: Array.from(Array(10).keys()).map((i) => i * 8),
  shadows: {
    card: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  },
  radii: {
    card: 4,
    button: 32,
  },
  layout: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    header: {
      bg: 'primary',
      color: 'textContrast',
      overflow: 'hidden',
      py: 3,
    },
    main: {
      width: '100%',
      flex: '1 1 auto',
    },
    container: {
      maxWidth: 768,
      mx: 'auto',
      overflow: 'hidden',
      p: 3,
    },
    footer: {
      bg: 'muted',
      p: 3,
      textAlign: 'center',
    },
    card: {
      bg: 'card',
      borderRadius: 'card',
      boxShadow: 'card',
      boxSizing: 'border-box',
      p: 4,
    },
  },
}
