export const desnormalizarTexto = (texto) =>
    texto?.replace(/_/g, ' ')
        .split(' ')
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(' ') || '';

export const normalizarTexto = (texto) =>
    texto?.trim().toLowerCase().replace(/\s+/g, '_') || '';