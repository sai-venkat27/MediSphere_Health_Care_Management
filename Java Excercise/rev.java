public class rev {
    public static void prints(int n){
        if(n==0){
            return;
        }
        System.out.println(n);
        prints(n-1);
    }
    public static boolean palindrome(String str,int left,int right){
        if(str.charAt(left) != str.charAt(right)){
            return false;
        }
        palindrome(str, left++, right--);
        return true;

    }
    public static void main(String[] args){
        String str = "malayalam";
        prints(100);
        if(palindrome(str,0,str.length()-1)){
            System.out.print("Got it right ?");
        }else{
            System.out.print("Not palindrome");
        }
    }
}
