import React from 'react'
import styles from "./Users.module.css"

export const Users = ({ users }) => {
    return (
        <div className={styles.ActiveUser}>
            <h2>
                {users.map(({ userName, id }) => (
                    <div key={id} className="activeItem">
                        {userName}
                    </div>
                ))}
            </h2>
        </div>
    )
}
