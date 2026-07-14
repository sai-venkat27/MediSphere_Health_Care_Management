import java.util.*;
class fib{
    public static void fib(int n)
    {
        int a = 0;
        int b =1;
        System.out.println(a+" ");
        System.out.println(b+" ");
        for(int i =2;i<n;i++){
            int c=a+b;
            System.out.println(c+" ");
            
            a =b;
            b =c;
        }
    }
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of terms: ");
        int n = sc.nextInt();
        System.out.println("Fibonacci series up to " + n + " terms:");
        fib(n);
        sc.close();
    }
}