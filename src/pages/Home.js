import React from 'react'
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box maxWidth="800px" marginLeft="20px" marginTop="50px">
      <Typography fontSize="24px" color="#a239ca" variant="h1">Witaj w naszym Kantorze!</Typography>
      <Typography color="#e7dfdd" variant = "body1" >
          Możesz u nas śledzić kursy średnie dwóch popularnych walut: Euro i USD.
          Wybierz interesującą Cię walutę z listy dostępnych opcji, a następnie przejdź do widoku szczegółów, 
          gdzie znajdziesz aktualny kurs średni wybranej waluty. 
          Dodatkowo, masz możliwość wyświetlenia tabeli kursów z ostatnich 30 dni, aby śledzić zmiany w wartości wybranej waluty.
          Nie tylko dostarczamy Ci informacje tekstowe, ale również prezentujemy dane na wykresie, abyś mógł łatwo zobaczyć trendy i historię kursów.
          Ciesz się korzystaniem z naszej aplikacji i bądź na bieżąco z kursami walut!
      </Typography>
    </Box>
  )
}

export default Home