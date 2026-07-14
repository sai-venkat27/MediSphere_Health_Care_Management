import java.util.*;
/*

1. take input string
2. Initialize a set containing all vowels
3. Start with the total length of the string as the initial count
4. Iterate characters in the string.
5. check character is vowel or not.
6. Print final count
*/
class strings{
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        String str2 = sc.nextLine();
        int count = str2.length();
        Set<Character> set = new HashSet<>();
        set.add('a');
        set.add('e');
        set.add('i');
        set.add('o');
        set.add('u');
        set.add('A');
        set.add('E');
        set.add('I');
        set.add('O');
        set.add('U');

        for(int i = 0; i < str2.length(); i++){
            if(!set.contains(str2.charAt(i))){
                count--;
            }
        }
        System.out.println("vowels in string : " + count);
        sc.close();
    }
}