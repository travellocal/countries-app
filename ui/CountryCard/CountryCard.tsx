import React from "react";
import classNames from "classnames";
import { Country } from "../../utils/api/country";
import styles from "./CountryCard.module.scss";

interface Props {
  country: Country
}

export const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <div className={classNames(styles.card, "py-2 px-3")}>
      <img className={classNames(styles.flag, "mr-2")} src={country.flags.png} alt="" width={20} height={20} />
      <span className={styles.name}>{country.name.common}</span>
    </div>
  );
}
