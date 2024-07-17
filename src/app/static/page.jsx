import homeStyles from '@/app/ComponentStyles/Home.css';
import supabase from '@/app/utils/supabase';

export default async function Posts() {
    const { data } = await supabase.FROM('posts').SELECT() 
    return <pre>{JSON.stringify(data)}</pre>  
}