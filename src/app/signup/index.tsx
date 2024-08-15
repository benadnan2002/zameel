import { useState } from "react";
import { Link } from "expo-router";
import { CircleAlert } from "lucide-react-native";
import { Button, Form, H1, Paragraph, ScrollView, Text, XStack, YStack } from "tamagui";

import { FormInput, FormPasswordChecklist, Logo, MySafeAreaView, MyStack } from "@/components";
import { useAdaptiveColor } from "@/hooks/useAdaptiveColor";
import { PRIMARY_COLOR } from "@/lib/constants";

type UserData = {
  fullname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function Index() {
  const [userData, setUserData] = useState<UserData>({
    fullname: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [valid, setValid] = useState({
    fullname: false,
    email: false,
    password: false,
    passwordConfirm: false
  });

  const handleChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <MySafeAreaView>
      <ScrollView>
        <MyStack
          mt="$10"
          jc="center"
          gap="$3"
          direction="rtl">
          <Logo style={{ height: 100 }} />
          <H1
            color={useAdaptiveColor("gray", 12)}
            textAlign="center">
            إنشاء حساب
          </H1>
          <Form>
            <YStack mb="$6">
              <FormInput
                value={userData.fullname}
                id="fullname"
                label="الاسم الكامل"
                placeholder="مثال: عبدالرحمن صالح عبدالرحيم سالم"
                onChangeText={(text: string) => handleChange("fullname", text)}
              />
              <WarningMessage />
              <FormInput
                value={userData.email}
                id="email"
                label="البريد الإلكتروني"
                placeholder="example@email.com"
                onChangeText={(text: string) => handleChange("email", text)}
              />
              <FormInput
                isValid={valid.password}
                value={userData.password}
                id="password"
                label="كلمة المرور"
                secureTextEntry
                onChangeText={(text: string) => handleChange("password", text)}
              />
              <FormPasswordChecklist
                value={userData.password}
                passwordConfirm={userData.passwordConfirm}
                onPasswordValidateChange={(validatedBoolean: boolean) =>
                  setValid((prev) => ({ ...prev, password: validatedBoolean }))
                }
              />
              <FormInput
                isValid={valid.password}
                value={userData.passwordConfirm}
                id="password-confirm"
                label="تأكيد كلمة المرور"
                onChangeText={(text: string) => handleChange("passwordConfirm", text)}
                secureTextEntry
              />
            </YStack>
            <Form.Trigger asChild>
              <Button>إنشاء حساب</Button>
            </Form.Trigger>
            <XStack
              jc="center"
              mt="$3"
              gap="$2">
              <Text
                fontFamily="$body"
                color={useAdaptiveColor("gray", 11)}>
                لديك حساب مسبقاً؟
              </Text>
              <Link
                asChild
                push
                href="/login">
                <Text
                  color={PRIMARY_COLOR}
                  fontFamily="$body">
                  سجل دخولك
                </Text>
              </Link>
            </XStack>
          </Form>
        </MyStack>
      </ScrollView>
    </MySafeAreaView>
  );
}

const WarningMessage = () => (
  <XStack
    mt="$2"
    gap="$3">
    <CircleAlert
      color={useAdaptiveColor("orange", 600, true)}
      size={32}
      style={{ marginTop: 10 }}
    />
    <YStack
      flex={1}
      my="$2"
      gap="$2">
      <Text
        fontSize="$1"
        fontFamily="$body"
        color={useAdaptiveColor("orange", 600, true)}>
        تجنب الأسماء الحركية والألقاب
      </Text>
      <Paragraph
        fontSize="$1"
        fontFamily="$body"
        o={0.8}
        textAlign="justify"
        lineHeight={22}
        color={useAdaptiveColor("orange", 600, true)}>
        هذا الاسم غير قابل للتعديل، وسيتم اعتماده عند طلب الانضمام لدفعة وتسليم التكاليف. وضع اسم
        غير حقيقي قد يؤدي إلى رفضك.
      </Paragraph>
    </YStack>
  </XStack>
);

export default Index;
