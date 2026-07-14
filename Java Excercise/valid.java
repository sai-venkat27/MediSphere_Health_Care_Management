import java.util.Stack;
class valid{
    public static boolean valid(String str){
        Stack<Character> stack = new Stack<>();
        for(char ch : str.toCharArray()){
            if(ch == '[' || ch=='{' || ch =='('){
                stack.push(ch);
            }else{
                if(stack.isEmpty()){
                    return false;
                }else{
                    char top = stack.pop();
                    if((ch ==')' && top =='(') || (ch=='}' && top =='{') || (ch == ']' && ch =='[')){
                        return true;
                    }
                }
            }
        }
        return false;
    }
    public static void main(String[] args) {
        if(valid("({[{]})")){
            System.out.print("It is valid paranthesis");
        }else{
            System.out.print("It is not paranthesis");
        }
    }
}