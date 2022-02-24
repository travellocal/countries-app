import classNames from "classnames"
import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import { CountryCard } from "../ui/CountryCard/CountryCard"
import { Country, getCountries } from "../utils/api/country"
import styles from "./index.module.scss"

const Home: NextPage = () => {

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries().then(response => setCountries(response));
  }, []);

  return (
    <div className={classNames(styles.page)}>
      <Head>
        <title>Countries of the world</title>
      </Head>

      <header className={classNames(styles.header, "py-6")}>
        <div className="container">
          <h1 className="title is-1 has-text-light">
            Countries of the world
          </h1>
        </div>
      </header>

      <div className="is-flex is-flex-wrap-wrap container my-4">
        {countries.map(c => (
          <CountryCard key={c.id} country={c} />
        ))}
      </div>

      <footer className={classNames(styles.footer, "py-6")}>
        <div className="container">
          <small>Data sourced from <a href="https://restcountries.com/" target="_blank" rel="noreferrer">Rest Countries</a></small>
        </div>
      </footer>
    </div>
  )
}

export default Home
