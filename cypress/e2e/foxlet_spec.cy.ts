describe('Sprawdzenie logowania', () => {
  it('register', () => {
    cy.visit('http://localhost:3000');
    cy.contains('a', 'Rejestracja').click();
    cy.get("input[name='user-name']").type('testowa nazwa');
    cy.get("input[name='email']").type('test.testowy@o2.pl');
    cy.get("input[name='password']").type('1234');
    cy.get("select[name='role']").select('employee');
    cy.contains('button', 'Zarejestruj się').click();

    cy.visit('http://localhost:3000');
    cy.get("img[src='/images/foxlet-logo.jpg']").click();
    cy.contains('a', 'Logowanie').click();
    cy.get("input[name='email']").type('test.testowy@o2.pl');
    cy.get("input[name='password']").type('1234');
    cy.contains('button', 'Zaloguj').click();
    cy.contains('span[id="user-name"]', 'Witaj, testowa nazwa!');
    cy.contains('a[href="/account/user"]', 'Konto');
    cy.contains('a[href="/assortment/pallets"]', 'Asortyment');
    cy.contains('button[name="logout"]', 'Wyloguj');
    cy.contains('div[role="alert"]', 'Zostałeś zalogowany.').click();

    // cy.visit('http://localhost:3000');
    cy.contains('a', 'Konto').click();
    cy.get('a[href="/account/employee"]').click();

    cy.get('input[name="first_name"]').type('Testowa paleta');
    cy.get('input[name="last_name"]').type('Testowa paleta');
    cy.get('input[name="PESEL"]').type('88888888888');
    cy.get('input[name="phone"]').type('888888888');
    cy.get('input[name="email"]').type('test.test@o2.pl');
    cy.get('input[name="country"]').type('Polska');
    cy.get('input[name="province"]').type('Małopolska');
    cy.get('input[name="postal_code"]').type('33-170');
    cy.get('input[name="city"]').type('Tarnów');
    cy.get('input[name="street"]').type('Ogrodowa 6');
    cy.get('button[name="update-employee"]').click();
    cy.contains(
      'div[role="alert"]',
      'Profil pracownika został utworzony'
    ).click();

    cy.contains('a', 'Asortyment').click();
    cy.get('button[name="create-palet"]').click();
    cy.get('input[name="pallet_name"]').type('Testowa paleta');
    cy.get("select[name='id_supplier']").select('1');

    cy.get('input[name="purchase_price"]').type('999');
    cy.get('input[name="purchase_date"]').type('2023-02-18T18:06:00.000');
    cy.get('input[name="delivery_date"]').type('2023-02-18T18:06:00.000');
    cy.get('button[type="submit"]').click();
    cy.contains('div[role="alert"]', 'Paleta została utworzona').click();
    cy.get('button[name="delete-pallet"]').click();
    cy.contains('button', 'Wyloguj').click();
  });
});
