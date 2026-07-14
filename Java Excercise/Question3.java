public class Question3 {
    public static void main(String[] args){
        int milk =20;
        int book = 40;
        int soap = 30;
        int marker = 80;
        int watch = 100;
        int sugar = 200;
        int veggies = 270;
        //find maximum price and minimum price
        
        int arr[] = {milk,book,soap,marker,watch,sugar,veggies};
        int max=arr[0];
        int min=arr[0];
        for(int i = 1; i < arr.length; i++){
            if(max<arr[i]){
                max=arr[i];
            }
            if(min>arr[i]){
                min=arr[i];
            }
        }
        System.out.printf("Maximum price , Veggies= %d\n", max);
        System.out.printf("Minimum price , Milk= %d\n", min);
        System.out.println("Successfully Completed : ) 👍");
    }
}
/*
step:01 - initialize all the variables with their respective values
step-02 - insert them into the array
step-03 - use for loop to iterate through the array
step-04 - use if condition to find the maximum
step -05 - use if condition to find the minimum


*/
