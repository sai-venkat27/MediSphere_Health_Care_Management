import java.util.*;

class SumOfNaturalNumbers{
    public static void sum(int n){
        int sum =0;
        for(int i =1;i<=n;i++){
            sum+=i;
        }
        System.out.print("Sum of natural numbers : "+sum);
    }
    void main(){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sum(n);
        System.out.printf("\nsum of %d numbers is %d",n,(n*(n+1))/2);
        sc.close();
    }
}