import React from 'react';

import { Container, Typography, Box, useMediaQuery, useTheme } from '@mui/material';

const AboutUs = () => {

    const theme = useTheme()
    const smBreakpoint = useMediaQuery(theme.breakpoints.up('sm'))

    return (
        <Container sx={{ mt: smBreakpoint ? '80px' : '20px' }}>
            <Box my={4} sx={{ fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`, color: 'white', background: '#00000099', padding: { xs: '5px 15px', md: '20px 35px' }, borderRadius: '24px' }}>
                {smBreakpoint ? <Typography variant="h2" component="h1" gutterBottom fontWeight='bold' textAlign="center">
                    БиблиотекаМK
                </Typography> :
                    <Typography variant="h4" component="h5" gutterBottom fontWeight='bold' textAlign="center">
                        БиблиотекаМK
                    </Typography>}
                <Typography variant={!smBreakpoint ? "body2" : "body1"} paragraph>
                    БиблиотекаМK е платформа која што потекнува од едноставна, но длабока идеја за да се создаде простор каде што љубителите на книги можат да откријат, истражуваат и да се нурнат во магичниот свет на книгите. Нашите полици се исполнети со широк спектар на книги од трејлери за повозрасната група на луѓе до различни читанки за мали деца.
                </Typography>
                <Typography variant={!smBreakpoint ? "body2" : "body1"} paragraph>
                    Нашиот посветен тим ентузијасти за книги е секогаш тука да ви помогне и понуди да го најдете вашето следно одлично читање. Со длабоко познавање на литературата и вистинска страст за услуги на клиентите, се стремиме секоја посета на БиблиотекаМK да ја направиме незаборавно искуство.
                </Typography>
            </Box>
        </Container >
    );
};

export default AboutUs;
