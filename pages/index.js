import Head from 'next/head'
import { getFeaturedEvents } from '../helpers/api-util'
import EventList from '../components/events/event-list'
import NewsletterRegistration from '@/components/input/newsletter-registration'

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allows you to evolve...' />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  )
}

export async function getStaticProps() {

  const featuredEvents = await getFeaturedEvents()

  return { 
    props: {
      events: featuredEvents
    },
    revalidate: 1800 // every 1800 seconds we re-generate this page for a new incoming request
  }
}

export default HomePage