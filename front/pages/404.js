import Link from 'next/link'

import {FaExclamationTriangle} from 'react-icons/fa'

import Layout from '@/components/Layout'

import styles from '@/styles/404.module.css'

export default function NotFoundPage() {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h3>Sorry, there is nothing here</h3>
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </div>
    </Layout>
  )
}
