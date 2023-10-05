const UserPage=({props})=>{
    console.log("pops",props);
    return props
}

export const getServerSideProps = async ()=>{
    const data = await(await fetch('http://localhost:3000/api/diagnosis')).json();
    console.log("props")
    return{
        props:{
            data
        }
    }
}
export default UserPage
