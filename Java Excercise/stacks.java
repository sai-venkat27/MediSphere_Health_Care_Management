// import java.util.*;
// class StackImplementation{
//     Stack<Integer> stack = new Stack<>();
//     public void stackAdd(int val){
//         stack.push(val);
//     }
//     public void display(){
//         while(!stack.isEmpty()){
//             System.out.print(stack.pop()+" ");
//         }
//     }
//     public void peek(){
//         if(stack.isEmpty()){
//             System.out.println("Stack is empty");
//             return;
//         }else{
//             System.out.println("Stack's peek element is "+stack.peek());
//         }
//     }
// }
// class stacks{
//     public static void main(String[] args){
//         Scanner sc = new Scanner(System.in);
//         System.out.print("Enter Stack size : ");
//         StackImplementation s = new StackImplementation();
//         int n = sc.nextInt();
//         for(int i = 0;i<n;i++){
//             s.stackAdd(sc.nextInt());
//         }
//         s.peek();
//         s.display();
        
//     }
// }
import java.util.Scanner;

class StackImplementation {
    int[] arr = new int[100]; // Fixed size array
    int top = -1;

    public void stackAdd(int val) {
        arr[++top] = val; // Move top up and insert
    }

    public void peek() {
        System.out.println("Stack's peek element is " + arr[top]);
    }

    public void display() {
        // Print from top to bottom
        for (int i = top; i >= 0; i--) {
            System.out.print(arr[i] + " ");
        }
        System.out.println();
    }
}

class stacks {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter Stack size : ");
        int n = sc.nextInt();
        
        StackImplementation s = new StackImplementation();
        
        for (int i = 0; i < n; i++) {
            s.stackAdd(sc.nextInt());
        }
        
        s.peek();
        s.display();
    }
}