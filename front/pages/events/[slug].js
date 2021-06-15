import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'

import {API_URL} from '@/config/index'

import {FaPencilAlt, FaTimes} from 'react-icons/fa'

import Layout from '@/components/Layout'

import styles from '@/styles/Event.module.css'

export default function EventPage({evt}) {
  const deleteEvent = (e) => {
    console.log('DELETE')
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt?.id}`}>
            <a>
              <FaPencilAlt />
              Edit Event
            </a>
          </Link>

          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>

        <span>
          {evt?.date} at {evt?.time}
        </span>

        <h1>{evt?.name}</h1>

        {evt?.image && (
          <div className={styles.image}>
            <Image src={evt?.image} width={960} height={600} />
          </div>
        )}

        <h3>Performs:</h3>
        <p>{evt?.performers}</p>

        <h3>Description:</h3>
        <p>{evt?.description}</p>

        <h3>Venue : {evt?.venue}</h3>
        <p>{evt?.adresse}</p>

        <Link href={`/events`}>
          <a className={styles.back}> {'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export async function getStaticProps({params: {slug}}) {
  const response = await fetch(`${API_URL}/api/events/${slug}`)

  const events = await response.json()

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const response = await fetch(`${API_URL}/api/events`)
  const events = await response.json()

  const paths = events?.map((evt) => ({
    params: {
      slug: evt?.slug,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

// export async function getServerSideProps({query: {slug}}) {
//   const response = await fetch(`${API_URL}/api/events/${slug}`)

//   const events = await response.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }
