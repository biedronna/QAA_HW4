
//wykorzystanie GET 

describe('Test GET API', () => {
  it('test GET to httpbin', () => {
      // Wykonaj zapytanie GET
      cy.request('GET', 'https://httpbin.org/get')
          .then((response) => {
              // Sprawdzenie statusu odpowiedzi
              expect(response.status).to.eq(200);
              expect(response.body).to.have.property('headers');
          });
  });
});

//wykorzystanie  POST 

describe('Test POST API', () => {
it('test POST to httpbin', () => {
  // Definiujemy dane, które chcemy wysłać
  const data = {
    name: 'User1',
    email: 'user1@example.com'
  };

  // Wysyłamy żądanie POST 
  cy.request({
    method: 'POST',
    url: 'https://httpbin.org/post',
    body: {
      name: 'User1',
      email: 'user1@example.com'
    }
  }).then((response) => {
    // Sprawdzamy, czy odpowiedź ma status 200
    expect(response.status).to.eq(200);
    
    // Sprawdzamy, czy odpowiedź zawiera wysłane dane
    expect(response.body.json).to.have.property('name', data.name);
    expect(response.body.json).to.have.property('email', data.email);
  });
});
});


//Wykorzystanie PUT

describe('Test API PUT', () => {
it('test PUT to httpbin', () => {
  // Definiowanie danych, które chcemy wysłać
  const data = {
    name: 'Joanna',
    age: 30,
    email: 'joanna@example.com'
  };

  // Wykonanie zapytania PUT
  cy.request({
    method: 'PUT',
    url: 'https://httpbin.org/put',
    body: data

  }).then((response) => {
    // Sprawdzenie odpowiedzi
    expect(response.status).to.eq(200); // Status odpowiedzi powinien być 200
    expect(response.body.json).to.deep.eq(data); // Sprawdzenie, czy wysłane dane są takie same w odpowiedzi
  });
});
});


// Wykorzystanie DELETE 

describe('Test DELETE API', () => {
it('test DELETE to httpbin', () => {
    // Wysyłanie zapytania DELETE 
    cy.request({
        method: 'DELETE',
        url: 'https://httpbin.org/delete'
    }).then((response) => {
        // Sprawdzenie odpowiedzi
        expect(response.status).to.eq(200); // Sprawdzenie statusu odpowiedzi
        expect(response.body).to.have.property('url', 'https://httpbin.org/delete'); // Sprawdzenie URL
      
    });
});
});

// test wysyłający i sprawdzający nagłówek User-Agent

describe('Test nagłówka User-Agent', () => {
it('test- nagłówek User-Agent', () => {
  // nagłówek User-Agent, który wysyłamy 
  const userAgent = 'userAgent1';

  // Wykonaj żądanie GET do httpbin z nagłówkiem User-Agent
  cy.request({
    method: 'GET',
    url: 'https://httpbin.org/user-agent',
    headers: {
      'User-Agent': userAgent
    }
  }).then((response) => {
    // Sprawdzenie odpowiedzi
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('user-agent', userAgent);
  });
});
});

//test wysyłający i sprawdzający nagłówki niestandardowe

describe('Test niestandardowych nagłówków w API', () => {
it('Wysłanie niestandardowych nagłówków i sprawdzenie odpowiedzi', () => {
    // Definiujemy niestandardowe nagłówki
    const myHeaders = {
        'Header1': 'Header_1',
        'Header2': 'Header_2'
    };

    // Wysyłamy zapytanie do httpbin z niestandardowymi nagłówkami
    cy.request({
        method: 'GET', // lub 'POST', w zależności od potrzeb
        url: 'https://httpbin.org/headers',
        headers: myHeaders
    }).then((response) => {
        // Sprawdzamy, czy odpowiedź zawiera nasze niestandardowe nagłówki
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('headers');
        expect(response.body.headers).to.have.property('Header1', 'Header_1');
        expect(response.body.headers).to.have.property('Header2', 'Header_2');
    });
});
});



//test, który wysyła losowe parametry 

describe('Test API POST - losowe parametry', () => {
it('test POST- losowe parametry', () => {
  // Generowanie losowych danych
  const randomData = {
    name: `User_${Math.floor(Math.random() * 100)}`,
    age: Math.floor(Math.random() * 100),
    isActive: Math.random() < 0.5 
  };

  // Wysyłanie żądania POST do httpbin.org
  cy.request({
    method: 'POST',
    url: 'https://httpbin.org/post',
    body: randomData
  
  }).then((response) => {
    // Sprawdzanie odpowiedzi
    expect(response.status).to.eq(200);
    expect(response.body.json).to.deep.eq(randomData); // Sprawdzenie, czy wysłane dane są takie same jak odpowiedź
  });
});
});


//test sprawdzający treści odpowiedzi

describe('Test API treść odpowiedzi', () => {
it('sprawdza treść odpowiedzi z GET', () => {
  // Wykonaj zapytanie GET do httpbin
  cy.request('https://httpbin.org/get')
    .then((response) => {
      // Sprawdzenie kodu statusu odpowiedzi
      expect(response.status).to.eq(200);
      // Sprawdzenie, czy odpowiedź zawiera oczekiwane dane
      expect(response.body).to.have.property('origin');
    });
});
});

// test sprawdzający czas odpowiedzi 

describe('Test API Response Time', () => {
it('Test API - czas odpowiedzi', () => {
  const maxResponseTime = 300; // maksymalny czas odpowiedzi w milisekundach

  cy.request('https://httpbin.org/get')
    .then((response) => {
      // Sprawdzenie, czy czas odpowiedzi jest mniejszy niż maksymalny czas
      expect(response.duration).to.be.lessThan(maxResponseTime);
    });
});
});
