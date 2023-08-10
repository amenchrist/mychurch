import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function Announcements() {

  const [cards, setCards] = useState([{title: '', image: '', description: ''}]) 

  useEffect(()=> {
    const controller = new AbortController();
    const signal = controller.signal;

    const options = {
      signal: signal,
    }

    fetch('https://christembassybarking.org/wp-json/wp/v2/posts', options ).then(res => res.json()).then((res) => {
      // console.log(res)
      let posts = []
      res.forEach(blog => {

        if(blog.categories[0] === 9){

          const title = blog.title.rendered;
          const image = blog.jetpack_featured_media_url;
          const description = blog.excerpt.rendered.replace(/<\/?p>/g, '');
          const timestamp = new Date(blog.modified).getTime() 
          
          // console.log(blog.title.rendered)
          // console.log(blog.modified.substring(0,10))
          // console.log(blog.content.rendered.replace(/<\/?p>/g, ''))
          // console.log(blog.excerpt.rendered.replace(/<\/?p>/g, ''))
          // console.log(blog.jetpack_featured_media_url)

          posts.push({title, image, description, timestamp})

        }
      })

      posts.sort((a,b) => b.timestamp - a.timestamp);
      setCards(posts);
      
    })
    return () => {
      //cancel the request before the component unmounts
      controller.abort();
    }
  }, [])

  // const cards = [
  //   {
  //     title: 'PRAISE NIGHT',
  //     image: 'https://christembassy.org/wp-content/uploads/2022/02/Pastor.jpg',
  //     description: "It's time for another special time of Praise and Worship to God hosted by the man of God Pastor Chris."
  //   },
  //   {
  //     title: 'Global Day of Prayer',
  //     image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.globaldiasporanews.com%2Fwp-content%2Fuploads%2F2020%2F12%2F1607113949_maxresdefault.jpg&f=1&nofb=1&ipt=4e14d6d0a73c44efef127f7ffef7fea6efeb4688199c638bc3dd0fb127d0af14&ipo=images',
  //     description: `It’s time to take action, as you join forces with the Man of God Pastor Chris at the Global Day of Prayer from 6pm GMT+1 Friday, December 2nd, 2022 to Saturday December 3rd, 2022.`
  //   },
  //   {
  //     title: 'December Global Communion Service',
  //     image: 'https://d3u1jgd2t7cgti.cloudfront.net/2022/04/03/18/01/33/322/164902329381_img_20220403_174314.jpg',
  //     description: "Get ready for the December 2022 edition of the global communion service with Pastor Chris. Taking place Sunday December 4th, 2022 from 3pm GMT"
  //   }
  // ];

  return (
    <Container  sx={{ p:2, height: "100%" }}>
          {/* End hero unit */}
          <Grid container spacing={2} sx={{  height: "100%", overflowY: "auto" }} >
            {cards.map((card,i) => (
              <Grid item key={i} xs={12} sm={12} md={12}>
                <Card
                  sx={{ height: '400px', display: 'flex', flexDirection: 'column', borderRadius: '2px' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      height: '56.25%',
                    }}
                    image={card.image}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions> */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
  )
}

