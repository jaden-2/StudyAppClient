import styles from "./group.module.css"
import Image from "next/image"

export default function GroupIcon({props}){

    return(
        <>
            <div className={styles.iconGroup}>
                <Image src={"/image/matter_blue.svg"} 
                alt="Group icon" 
                width={50}
                height={50}/>
                <div className={styles.description}>
                    <h4>{props.title}</h4>
                </div>
            </div>
        </>
    )
}