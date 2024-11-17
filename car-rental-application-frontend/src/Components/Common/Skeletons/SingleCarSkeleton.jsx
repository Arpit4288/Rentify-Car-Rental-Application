import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const SingleCarSkeleton = () => {
    return (
        <>
            <div className="d-flex justify-content-around">
                <Card style={{ width: '25rem', backgroundColor: 'rgb(238, 232, 214)' }} className='box-shadow'>
                    <Card.Img variant="top" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBw0HBw0HBwcHBw0HBwcHCA8ICQcNFREWFhURExMYHSggGBoxJxMTITEhMSkrLi4uFx8zODMtNygtLjcBCgoKDQ0NDg0NDysZFRkrKy0rKy0rKy0rKysrKy0rKystKy0rNysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAACAwQAAQUG/8QAGhABAQEBAQEBAAAAAAAAAAAAAAIBEgMRE//EABgBAQEBAQEAAAAAAAAAAAAAAAABAwIE/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/APFzHcx3MFmPa87mYPMbMHmA2YOcbMMzEGnDJxpkyZFacMmXZk2ZQDkiyTJkeSilZLvJ2Q3CBGyHZUbAdkE2yDZU7JdSomrC9xTUl1IJ6wusUVJdYCesBWH1hdYBFYXWHVhdYoTWA3DawG4BO4DcN3AbgF7gNw3cBuIF7jm4Pcc3AB8cH8YHu5gswWYLMdOQ5I8kWSPJAMyZMimTJkHJk2ZdmTplyoZk2YFMHTCKCYHkGzBmQik5DvCjPN380ok2A7CzYBUFEVQXULKgqoWojqSqlZUE1KiWpKqVVSVUlE1YVWKakqpBPWFViisLrFonrC6w+sLrAJ3C9w7cBuAVuA3DdwG4gXuObg9xzcUB8YXxgfQ5gskWYLMWo5kmTLs4ZMpRyZNmWmTpko0ydENEnxKVXIg6IdiD4hzVDMGzBkwbMJQnId4UZDvCVUmwCoWbAKgohqCbhdcE3C1ENwTcrbgm5KIqkqpV3JNytElSVUqrkmpKqWsKrFNYTWFRPWFViisKrFoRWA3DawFYUK3Abhmh0ql7jm4PQ7ggfjgvjKPpMHmF4ZKUhk4ZOAk6cKQcydEgjD4xKg4k+JBGKIkqiiVESGJURLmq0QdMNEnTKAMh3g3JblKpGyXUqdwusKJLkm5V3hF4tRHckXKy8IvCiS5IvFd4ReFWJLkm8VXhF4UTXhNYpvCbxaJqwmsUVhVYtCKwqsPrCqwoVuA3DdwG4IXuOfB7jnxQDD+MD3J02dTTRs04qxVGnQmjVEaUimFEYm81PmUiiMUeeEeanzKQ6MURhMKIShkYbOAkzEUWY3xm3QDpdGbpVaBVkWdekXpQi8Is+9IsoReEXh9k2Ce8JvD7Jsqp7wm8UUTeLUT3hNYorCaxQisLrDqwvcAncDuG7gdxUK+OfDeXOVC/jGcsIrmjopJNHRTKtItilPnqHzpV50Ui3z1V56i86VeelSLfNT5pPPVPnpSKoPjU0afOlIonR5pE0PKSh31zaL6DtAOqLqg1RdUDXRF07VE3QOXpF6K6JqhQ3pN6OtJrQBRNGVpVKF0TR1FUqE1hVYdRdYoRWA3DtwG4ITuB5O3HPioTy3JvLcqFcsbywJpo6KSzp0axrWLPOlXnSHz1T50lIv8AKlfnTz/OlfnRSL/OlXnSDzpTFLUi6KOmkUUdNpSK8oXaXLd7KRT2HbI2w7YQ2rLqyqsurCDqyqsFWVVgOqKqg1ZdUDtUXWubQN1Rq0utd3QbqoGi6Hug1QvQaPQaqF7gdwzQ6Be43wbnxUB8b4P43xUD8YToPHnTo0iTZ1i3UxqnzpHGnxSC7zpV50g86Uedg9DztTFvOi1EWJF82bNoZ9DZ9AizPR39Emejv6BFO+gd9E++gd9AOr0Lqyt9C6sDasurL2y9sDdsG0XtB2lQe0HdBtOboC3Q7od1zdUbdBuu7oN1UbQa7ug3VRtDrbod0HXHPrn1QX1voPrfSpB/WB9YI8nNHOlZos1k1UTp0UlmjZoFkUfFoZs6bB6EWdHo8+LOn0QehPoZnogn0Mz0Bdno7+iPPR39AVb6B30T/oHfQD9sG2Tth2wO2wbRW2HbVDtoPRXTdAZ03RXTdKGfQ7ofrm6o7uh3XN0O6I7ug3XNoG0EFuh3QbQdpSD2nOi9oO0Ib050V050B3TEdstI8/NHlEZospw7UZQ5pNlDygVTZs2jyzJsgtmzZ9EM2ZNoL59B56IZ9DM9AW56O/ojz0F+iKr/AEc203bnYijbc2yOw9qH9udkdt0of03RHTuUB3TvRPTvQG9ObpfTnQD3Q7QdoG0Atovac2i6pUFtA2g1Re0A9oO2XtA2wN7bsjbc7VD+3CO2BNlO5RP13pFPyhZRGU7lAoyh5abKFlEFU2ZNpMoeWCvLMy0eWPLRVeegstJliywVdt2m7d7BR252n7bsFHbdp+3cpUUdO5SfKFlAoyneiMoWUKb03RfTfUBbQdoO6HdBqouqatLqlGqi6pyqLqhHdoG0CqBtAZtB2i9oO0qHdsR0wA+u/XGAX136zA7mizWZQWULKZkB5Qsp1gFlO5TMii6bpmBunemZRunemYR3KFlMwDzRZrMKL631xkVt0G6zAXWl1rMBVaVWsyoXWl7rMIHdDuswOfWZlH//2Q==" />
                    <Card.Body>
                        <Placeholder as={Card.Title} animation="glow">
                            <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                            <Placeholder xs={6} /> <Placeholder xs={8} />
                        </Placeholder>
                        <Placeholder.Button variant="dark" xs={6} />
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default SingleCarSkeleton