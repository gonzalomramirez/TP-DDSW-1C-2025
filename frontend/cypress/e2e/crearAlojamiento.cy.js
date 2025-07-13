describe('Crear Alojamiento como Anfitrión con MUI avanzado', () => {
  it('debería iniciar sesión, navegar y crear alojamiento con todos los campos MUI', () => {
    cy.visit('http://localhost:4000');

    // Login
    cy.get('svg[data-testid="AccountCircleIcon"]').parent('button').click();
    cy.get('input[type="email"]').type('rabarrios@birbnb.com');
    cy.contains('Ingresar').click();
    cy.contains('Cancelar').click();

    // Abrir menú y "Mis alojamientos"
    cy.get('svg[data-testid="MenuIcon"]').parent('button').click();
    cy.contains('Mis alojamientos').click();

    cy.contains('Agregar Alojamiento').click();

    // Nombre y Descripcion
    cy.get('input[name="nombre"]:visible').first().type('Casa acogedora en las sierras', { force: true });
    cy.get('input[name="descripcion"]:visible').first().type('Un lugar muy lindo para descansar.', { force: true });

    // País
    cy.get('input[aria-autocomplete="list"]:visible').eq(0).click({ force: true }).type('Arg', { force: true });
    cy.contains('li', 'Argentina').click({ force: true });

    // Ciudad
    cy.get('input[aria-autocomplete="list"]:visible').eq(1).click({ force: true }).type('Cór', { force: true });
    cy.contains('li', 'Córdoba').click({ force: true });

    // Calle y Altura
    cy.get('input[name="calle"]:visible')
        .first()
        .clear()
        .type('Medrano', { force: true });

    cy.get('input[name="altura"]:visible')
        .first()
        .clear()
        .type('500', { force: true });

    // Cant. de huespedes
    cy.get('input[name="cantidadMaximaHuespedes"]:visible').clear().type('{uparrow}{uparrow}{uparrow}');

    // Moneda y Precio por noche
    cy.get('div[role="combobox"]:visible')
        .contains('ARS') // o el label actual
        .click({ force: true });
    cy.get('ul[role="listbox"]').contains('USD').click();

    cy.get('input[name="precioPorNoche"]:visible')
        .first()
        .clear()
        .type('50', { force: true });

    // Check-in y Check-out
    cy.get('input[name="horarioCheckIn"]:visible').click({ force: true }).clear({ force: true }).type('14:00', { force: true });
    cy.get('input[name="horarioCheckOut"]:visible').click({ force: true }).clear({ force: true }).type('11:00', { force: true });

    // Características
    cy.get('div[role="combobox"].MuiSelect-multiple:visible')
        .first()
        .click({ force: true });

    cy.get('ul[role="listbox"]')
        .contains('WIFI')
        .scrollIntoView()
        .click();
    cy.get('div[role="combobox"].MuiSelect-multiple').should('contain', 'WIFI');


    cy.get('div[role="combobox"].MuiSelect-multiple:visible')
        .first()
        .click({ force: true });

    cy.get('ul[role="listbox"]')
        .contains('PISCINA')
        .scrollIntoView()
        .click();
    cy.get('div[role="combobox"].MuiSelect-multiple').should('contain', 'PISCINA');

    // Imágen
    cy.get('svg[data-testid="EditIcon"]:visible')
        .first()
        .parent()
        .click({ force: true });

    cy.get('input[name="fotos"]:visible')
        .first()
        .type('https://www.cabanias.com.ar/blog/wp-content/uploads/2023/08/Blog-Sierras-de-Cordoba-2.jpg', { force: true });

    cy.get('input[name="fotos"]')
        .should('have.value', 'https://www.cabanias.com.ar/blog/wp-content/uploads/2023/08/Blog-Sierras-de-Cordoba-2.jpg');

    cy.get('svg[data-testid="EditIcon"]:visible')
        .first()
        .parent()
        .click({ force: true });

    // Guardar
    cy.contains('button', 'Guardar').realClick();

    // Ir al alojamiento
    cy.get('.MuiCard-root')
        .contains('Casa acogedora en las sierras')
        .should('be.visible')
        .click();
  });
});
