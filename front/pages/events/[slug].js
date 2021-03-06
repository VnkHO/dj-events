import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'

import {API_URL} from '@/config/index'

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {FaPencilAlt, FaTimes} from 'react-icons/fa'

import Layout from '@/components/Layout'

// for Map
// import EventMap from '@/components/EventMap'

import styles from '@/styles/Event.module.css'

export default function EventPage({evt}) {
  const router = useRouter()

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt?.date).toLocaleDateString('en-US')} at {evt?.time}
        </span>

        <h1>{evt?.name}</h1>

        <ToastContainer />

        {evt?.image && (
          <div className={styles.image}>
            <Image
              src={evt?.image?.formats?.medium?.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performs:</h3>
        <p>{evt?.performers}</p>

        <h3>Description:</h3>
        <p>{evt?.description}</p>

        <h3>Venue : {evt?.venue}</h3>
        <p>{evt?.adresse}</p>

        {/* <EventMap evt={evt} /> */}

        <Link href={`/events`}>
          <a className={styles.back}> {'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

// export async function getStaticProps({params: {slug}}) {
//   const response = await fetch(`${API_URL}/events?slug=${slug}`)

//   const events = await response.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1,
//   }
// }

// export async function getStaticPaths() {
//   const response = await fetch(`${API_URL}/events`)
//   const events = await response.json()

//   const paths = events?.map((evt) => ({
//     params: {
//       slug: evt?.slug,
//     },
//   }))

//   return {
//     paths,
//     fallback: true,
//   }
// }

export async function getServerSideProps({query: {slug}}) {
  const response = await fetch(`${API_URL}/events?slug=${slug}`)

  const events = await response.json()

  return {
    props: {
      evt: events[0],
    },
  }
}
