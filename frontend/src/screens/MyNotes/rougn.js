<Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion/>


      <Accordion>
          <Card style={{ margin: 10 }} key={note._id}>
            <Card.Header style={{ display: "flex" }}>
              <span
                // onClick={() => ModelShow(note)}
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Toggle as="sdsda" variant="link" eventKey="0">
                  {note.title}
                </Accordion.Toggle>
              </span>

              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            {/* <Accordion.Collapse eventKey="0"> */}
            <Card.Body>
              <Badge bg="success">Category - {note.category}</Badge>
              <blockquote className="blockquote mb-0">
                <p className="fs-6 mt-2">{note.content}</p>
                <footer style={{ fontSize: 14, opacity: 0.5 }}>
                  Created on - date
                </footer>
              </blockquote>
            </Card.Body>

            {/* </Accordion.Collapse> */}
          </Card>
        </Accordion> 


        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="d-flex justif-content-center">
                <div className="me-5">
                  <span>{note.title}</span>
                </div>
                <div>
                  <Button href={`/note/${note._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Badge bg="success">Category - {note.category}</Badge>
              <blockquote className="blockquote mb-0">
                <p className="fs-6 mt-2">{note.content}</p>
                <footer style={{ fontSize: 14, opacity: 0.5 }}>
                  Created on - date
                </footer>
              </blockquote>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>