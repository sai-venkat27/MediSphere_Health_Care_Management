public class String2 {
    public static boolean palin(String str){
        int left =0;
        int right = str.length()-1;
        if(str.length()==0){
            return false;
        }
        while(left <=right){
            if(str.charAt(left) != str.charAt(right)){
                return false;
            }
            right--;
            left++;
        }
        
        
        return true;
    }
    public static String unique(String str) {
    // Frequency array for ASCII characters
    int[] freq = new int[256];
    
    // First pass: count character frequencies
    for (int i = 0; i < str.length(); i++) {
        freq[str.charAt(i)]++;
    }
    
    // Second pass: find first character with frequency 1
    for (int i = 0; i < str.length(); i++) {
        if (freq[str.charAt(i)] == 1) {
            return str.charAt(i) + "";
        }
    }
    
    return "null";
}
    public static void main(String[] args) {
        boolean res = palin("My gym");
        if(res){
            System.out.println("it is palindrome");
        }else{
            System.out.println("It is not palindrome");
        }
    }
}
