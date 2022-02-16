import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { typeSelect } from './typesSlice'
import { createSelector } from 'reselect'

import styles from './Footer.module.css'
import classnames from 'classnames'

const typesListSelector = createSelector(
  (state) => state.types,
  (types) => types
)

function Footer () {
    const dispatch = useDispatch()
    const types = useSelector(typesListSelector)

    return (
        <div className={styles.footer}>
            <ul className={styles.types}>{ types.allTypes.map((type) => (
                <li key={ type.id }
                    onClick={() => dispatch(typeSelect({ id: type.id }))}
                    className={classnames(styles.type, {[styles.active]: types.selectedTypes.includes(type)}, type.name)}
                >{ type.name }</li>
            ))}</ul>
        </div>
    )
}

export default Footer
