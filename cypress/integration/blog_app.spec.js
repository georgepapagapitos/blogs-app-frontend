describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset');
    const user = {
      name: 'George Papagapitos',
      username: 'gpapagapitos',
      password: 'password'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('log in to application');
    cy.get('button:first')
      .should('contain', 'log in');
  });

  it('login form can be opened', function () {
    cy.get('button:first').click();
  });

  describe('Login', function () {
    it('succeeds with valid credentials', function () {
      cy.get('button:first').click();
      cy.get('#username').type('gpapagapitos');
      cy.get('#password').type('password');
      cy.get('#login-button').click();
      cy.contains('George Papagapitos logged in');
    });
    it('fails with wrong credentials', function () {
      cy.get('button:first').click();
      cy.get('#username').type('gpapagapitos');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('html').should('not.contain', 'George Papagapitos logged in');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'gpapagapitos', password: 'password' });
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'blog one', author: 'author one', url: 'http://www.google.com' });
      });

      it('the blog details can be viewed', function () {
        cy.contains('view').click();
      });

      it('the blog can be liked', function () {
        cy.contains('view').click();
        cy.get('.like-button').click();
        cy.get('.blog-likes')
          .should('contain', '1');
      });

      it('the blog can be deleted', function () {
        cy.contains('view').click();
        cy.get('.delete-button').click();
        cy.get('.success').should('contain', 'deleted blog');
      });
    });

    it('a blog can be created', function () {
      cy.contains('add a blog').click();
      cy.get('#title-input').type('a blog posted by cypress');
      cy.get('#author-input').type('author of blog');
      cy.get('#url-input').type('http://www.google.com');
      cy.contains('add blog').click();
      cy.contains('a blog posted by cypress');
    });
  });
});