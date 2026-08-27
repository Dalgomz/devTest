describe('Product catalogue', () => {
  const products = [
    {
      id: 'iphone-15',
      brand: 'Apple',
      model: 'iPhone 15',
      price: 999,
      imgUrl: '/phone.svg',
    },
    {
      id: 'galaxy-s24',
      brand: 'Samsung',
      model: 'Galaxy S24',
      price: 899,
      imgUrl: '/phone.svg',
    },
  ]

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.intercept('GET', '**/api/product', {
      statusCode: 200,
      body: products,
    }).as('getProducts')
  })

  it('Loads products and filters them by search text', () => {
    cy.visit('/')
    cy.wait('@getProducts')

    cy.get('.product-grid > div').should('have.length', 2)
    cy.contains('Apple').should('be.visible')
    cy.contains('Samsung').should('be.visible')

    cy.get('input[type="text"]').type('samsung')

    cy.get('.product-grid > div').should('have.length', 1)
    cy.contains('Galaxy S24').should('be.visible')
    cy.contains('iPhone 15').should('not.exist')
  })

  it('Opens product details and updates the cart count', () => {
    const product = {
      ...products[0],
      cpu: 'A16 Bionic',
      options: {
        storages: [{ name: '128 GB', code: '1000' }],
        colors: [{ name: 'Black', code: '1000' }],
      },
    }

    cy.intercept('GET', '**/api/product/iphone-15', {
      statusCode: 200,
      body: product,
    }).as('getProduct')
    cy.intercept('POST', '**/api/cart', {
      statusCode: 201,
      body: { count: 1 },
    }).as('addToCart')

    cy.visit('/details/iphone-15')
    cy.wait('@getProduct')

    cy.contains('h3', 'Description').should('be.visible')
    cy.contains('A16 Bionic').should('be.visible')
    cy.contains('button', 'Add to cart').click()
    cy.wait('@addToCart')

    cy.contains('1').should('be.visible')
  })
})
