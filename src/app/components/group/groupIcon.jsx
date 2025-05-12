import styles from "./group.module.css"
import Image from "next/image"

export default function GroupIcon({group}){

    return(
        <>
            <div className={styles.iconGroup}>
                <Image src={"/image/matters.svg"} 
                alt="Group icon" 
                width={50}
                height={50}/>
                <div className={styles.description}>
                    <h4>{group.title}</h4>
                </div>
            </div>
        </>
    )
}