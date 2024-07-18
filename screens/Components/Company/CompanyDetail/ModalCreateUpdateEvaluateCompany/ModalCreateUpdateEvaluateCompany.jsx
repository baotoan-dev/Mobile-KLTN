import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompanyReviewAction,
  getCompanyRatingOfAccountAction,
} from "../../../../../redux/store/CompanyRating/CompanyRatingOfAccount/companyRatingOfAccountSlice";
import {
  createCompanyRatingAction,
  getCompanyRatingAction,
} from "../../../../../redux/store/CompanyRating/companyRatingSlice";

export default function ModalCreateUpdateEvaluateCompany({
  company,
  openModalCreateUpdateEvaluateCompany,
  setOpenModalCreateUpdateEvaluateCompany,
}) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewCompanyOfAccount, setReviewCompanyOfAccount] = useState({});
  const [checkClickUpdate, setCheckClickUpdate] = useState(false);
  const [commentOfAccount, setCommentOfAccount] = useState("");
  const [ratingOfAccount, setRatingOfAccount] = useState(0);
  const companyRatingOfAccount = useSelector(
    (state) => state.companyRatingOfAccount.companyRatingOfAccount
  );

  useEffect(() => {
    dispatch(getCompanyRatingOfAccountAction(company.id, "vi"));
  }, [company]);

  useEffect(() => {
    if (companyRatingOfAccount && companyRatingOfAccount.data) {
      setCommentOfAccount(companyRatingOfAccount.data.comment);
      setRatingOfAccount(companyRatingOfAccount.data.star);
      setReviewCompanyOfAccount(companyRatingOfAccount.data);
    }
  }, [companyRatingOfAccount]);

  const handleDeleteReview = () => {
    dispatch(deleteCompanyReviewAction(reviewCompanyOfAccount.id));
    setOpenModalCreateUpdateEvaluateCompany(false);
    dispatch(getCompanyRatingAction(company.id, 10, 0, "vi"));
    dispatch(getCompanyRatingOfAccountAction(company.id, "vi"));
  };

  const handleStarPress = (value) => {
    setRating(value);
  };

  const createReview = () => {
    try {
      setOpenModalCreateUpdateEvaluateCompany(false);
      dispatch(createCompanyRatingAction(company.id, rating, comment));
      dispatch(getCompanyRatingAction(company.id, 10, 0, "vi"));
      dispatch(getCompanyRatingOfAccountAction(company.id, "vi"));
    } catch (error) {
        ToastAndroid.show("Đánh giá không thành công", ToastAndroid.SHORT);
    }
  };

  const handleUpdateStarPress = (value) => {
    setRatingOfAccount(value);
  };

  const updateReview = () => {
    setOpenModalCreateUpdateEvaluateCompany(false);
    dispatch(
      createCompanyRatingAction(company.id, ratingOfAccount, commentOfAccount)
    );
    dispatch(getCompanyRatingAction(company.id, 10, 0, "vi"));
    dispatch(getCompanyRatingOfAccountAction(company.id, "vi"));
    setCheckClickUpdate(false);
  };

  return (
    <View>
      <Modal
        isVisible={openModalCreateUpdateEvaluateCompany}
        onBackdropPress={() => setOpenModalCreateUpdateEvaluateCompany(false)}
        onSwipeComplete={() => setOpenModalCreateUpdateEvaluateCompany(false)}
        swipeDirection={["down"]}
        animationIn={"bounceInUp"}
        animationOut={"bounceOutDown"}
        style={styles.bottomModal}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.titleHeader}>Đánh giá của bạn</Text>
            <TouchableOpacity
              onPress={() => setOpenModalCreateUpdateEvaluateCompany(false)}
            >
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          </View>
          {reviewCompanyOfAccount && reviewCompanyOfAccount.id ? (
            !checkClickUpdate ? (
              <View style={styles.reviewContainer}>
                <Text>Bạn đã đánh giá</Text>
                <View style={styles.content}>
                  <Text>{reviewCompanyOfAccount.comment}</Text>
                  <View style={styles.starContainer}>
                    <Text>{reviewCompanyOfAccount.star}</Text>
                    <AntDesign name="star" size={18} color="black" />
                  </View>
                </View>
                <View style={styles.action}>
                  <TouchableOpacity
                    style={{
                      width: "25%",
                    }}
                    onPress={handleDeleteReview}
                  >
                    <Text
                      style={[
                        styles.button,
                        {
                          backgroundColor: "#D24545",
                          color: "white",
                          textAlign: "center",
                        },
                      ]}
                    >
                      Xóa
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "25%",
                    }}
                    onPress={() => setCheckClickUpdate(true)}
                  >
                    <Text
                      style={[
                        styles.button,
                        {
                          marginLeft: 10,
                          backgroundColor: "#FFD6A5",
                          textAlign: "center",
                        },
                      ]}
                    >
                      Sửa
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginTop: 10,
                    color: "#242670",
                  }}
                >
                  Chỉnh sửa đánh giá của bạn
                </Text>
                <View style={styles.starSelectionContainer}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <TouchableOpacity
                      key={value}
                      onPress={() => handleUpdateStarPress(value)}
                    >
                      <Text
                        style={{
                          fontSize: 30,
                          color: value <= ratingOfAccount ? "gold" : "gray",
                        }}
                      >
                        &#9733;
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder="Nhập đánh giá của bạn"
                    value={commentOfAccount}
                    onChangeText={(text) => setCommentOfAccount(text)}
                  />
                </View>
                <View style={[styles.buttonContainer]}>
                  <TouchableOpacity
                    onPress={updateReview}
                    style={styles.sendButton}
                  >
                    <Text style={styles.buttonText}>Cập nhật</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      setOpenModalCreateUpdateEvaluateCompany(false)
                    }
                    style={styles.cancelButton}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { backgroundColor: "#D24545", color: "white" },
                      ]}
                    >
                      Hủy
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )
          ) : (
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 10,
                  color: "#242670",
                }}
              >
                Thêm đánh giá của bạn
              </Text>
              <View style={styles.starSelectionContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <TouchableOpacity
                    key={value}
                    onPress={() => handleStarPress(value)}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        color: value <= rating ? "gold" : "gray",
                      }}
                    >
                      &#9733;
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập đánh giá của bạn"
                  onChangeText={(text) => setComment(text)}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={createReview}
                  style={styles.sendButton}
                >
                  <Text style={styles.buttonText}>Gửi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOpenModalCreateUpdateEvaluateCompany(false)}
                  style={styles.cancelButton}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { backgroundColor: "#D24545", color: "white" },
                    ]}
                  >
                    Hủy
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "35%",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  starSelectionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  sendButton: {
    width: "45%",
    backgroundColor: "#FFD6A5",
    marginHorizontal: 10,
    marginTop: 10,
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
  },
  cancelButton: {
    width: "45%",
    backgroundColor: "#D24545",
    marginHorizontal: 10,
    marginTop: 10,
    textAlign: "center",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
  },
});
