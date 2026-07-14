public class FirstUnique {
    public static String unique(String str) {
        for (int i=0;i<str.length();i++) {
            
            if (str.indexOf(str.charAt(i)) == str.lastIndexOf(str.charAt(i))) {
                return str.charAt(i)+"";
            }
        }
        return "null"; 
    }
    public static void main(String[] args) {
        String input = "abcabace";
        String str = unique(input);
        if(str == "null"){
            System.out.println("no repeats");
        }else{
            System.out.print("Unique is "+str);
        }
    }
    /*
         Algorithm in 5 steps
            1. Loop through the string
            2. Check if the first index of the character is equal to the last index of the character
            3. If they are equal, return the character as a string
            4. If no unique character is found, return "null"
            5. In the main method, check if the returned string is "null" and print "no repeats" or print the unique character
    
    */
}