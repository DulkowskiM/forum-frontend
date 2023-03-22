import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Forum internetowe
              </h6>
              <p>Dołącz do naszej społeczności już dziś,zarejestruj się.</p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Przydatne linki</h6>
              <p>
                <a href="#!" className="text-reset">
                  Regulamin
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  onClick={() => (window.location.href = '/register')}
                >
                  Rejestracja
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  className="text-reset"
                  onClick={() => (window.location.href = '/login')}
                >
                  Logowanie
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Kontakt</h6>
              <p>Mateusz Dulkowski</p>
              <p>przykladowy@gmail.com</p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        © 2022 Copyright: Dulkowski
      </div>
    </MDBFooter>
  );
}
