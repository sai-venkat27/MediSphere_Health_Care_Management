public class swap {
    public static void main(String[] args){
        int num1 = 10;
        int num2 = 20;
        System.out.println("Before swapping : num1 = "+num1+" num2 = "+num2);
        num1 = num1 + num2;
        num2 = num1 - num2;
        num1 = num1 - num2;
        System.out.println("After swapping : num1 = "+num1+" num2 = "+num2);
    }
}
/*
num1 =10
num2 =20
step:1 - add both numbers and store in num1
       num1 = 10+20=30
       num1=30
step:2 - subtract num1 from num2 and store in num2
         num2 = 30-20=10
         num2=10
step:3 - subtract num2 from num1 and store in num1
         num1 = 30-10=20
         num1=20
step:4 - print the swapped values of num1 and num2
         num1=20
         num2=10
step-05: print the swapped values
*/
