use m_rules::my_vec;
// 测试声明宏
fn test_rules() {
    let v1: Vec<u32> = my_vec![1, 2, 3];
    let v2: Vec<&str> = my_vec!["hello", "world"];
    println!("v1 {:?}", v1);
    println!("v2 {:?}", v2);
}
fn main() {
    test_rules();
}
