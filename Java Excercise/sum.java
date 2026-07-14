/*
Algorithm
step:1 - initialize a, b, c =0 
step:2 - start from index 0
step:3 - Take if condition <arr.length /2 and 
            use b to store sum of first five numbers
            1+2+3+4+5
step: 4 : Take if condition of >arr.length/2 and 
            use c to store of last five numbers
            6+7+8+9+10
step: 4 - iterative until the last index has reached
step: 5-  GEt the total sum of array by adding both variables 'a' and 'b'
*/
class sum{
    public static void main(String []args){
        int a = 0,b=0,c=0;
        int arr[] = {1,2,3,4,5,6,7,8,9,10};
        for(int i =0;i<arr.length;i++){
            if(i<arr.length/2){
                b+=arr[i];
            }else{
                c+=arr[i];
            }
        }
        a = b+c;
        System.out.println("first half sum = "+b);
        System.out.println("Second half sum = "+c);
        System.out.print("Total Sum = "+a);
    }
}