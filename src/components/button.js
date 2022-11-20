import Button from 'react-bootstrap/Button';

export function CustomButton({color, text}){
    return(
        <>
            <Button variant={`${color}`}>{text}</Button>{' '}
        </>  
    )
    
}

