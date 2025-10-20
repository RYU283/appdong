
#include<stdio.h>
#include<math.h>

#define TAXRATE1 0.06
#define P 3.141592 
void 2w1();
void 2w2();
void 3w1();
void 3w2();

int main(){
    a();
    return 0;
}

void 2w1(){
    double income;
    printf("연봉을 입력하셈");
    scanf("%lf", &income);
    printf("당신의 월급은.. %lf 입니다.", income/12);
}

void 2w2(){
    double l;
    printf("반지름을 입력해라");
    scanf("%lf", &l);
    printf("반지름이 %lf 인 원의 둘레 : %lf , 원의 넓이 : %lf", l, l*2*P, l*l*P);
}

void 3w1(){
    int ham, pot, coke;
    printf("햄버거와 브랜치 프라이 갯수를 입력하세요, 구분은 , 로: ");
    scanf("%d,%d", &ham, &pot);
    printf("음료의 갯수를 입력하세요: ");
    scanf("%d", &coke);
    printf("햄버거와 프랜치 프라이의 갯수는 각각 %d개, %d개, 음료의 갯수는 %d개 입니다.", ham, pot, coke);
}

void 3w2(){
    double x;
    printf("숫자 x를 입력하세요");
    scanf("%lf", &x);
    printf("tan(x) : %lf\n", tan(x));
    printf("ln(x) : %lf\n", ln(x));
    printf("e의 x 제곱 : %lf\n", exp(x));
    printf("제곱근  x : %lf \n", sqrt(x));    
}

void 4w1(){
    const int TAXRATE2 = 0.45;
    int tax1, tax2;
    printf("10억원을 초과하는 연봉, 1400만원 이하의 연봉을 공백으로 구분하여 입력하세요.");
    scanf("%d %d", &tax1, &tax2);
    printf("연봉이 %d 만원 일때, 세금은 %lf 입니다.\n", tax1, (float)tax1*TAXRATE2);
    printf("연봉이 %d 만원 일때, 세금은 %lf 입니다.\n", tax2, (float)tax2*TAXRATE1);
}
void 4w2(){
    printf("");
    scanf
}