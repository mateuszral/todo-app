import { createStore, createHook } from 'react-sweet-state';

import { translateError } from 'helpers';

import { auth, authentication, database } from 'fire';

const userStore = createStore({
  initialState: {
    userId: '',
    username: '',
    email: '',
    loggedIn: false,
    userDel: false,
    emailSent: false,
    passChanged: false,
    firebaseErr: false,
    message: '',
    loggedOut: false,
  },
  actions: {
    registerUser: ({ username, email, password, repeatPassword }) => ({ setState }) => {
      if (password === repeatPassword) {
        auth.setPersistence(authentication.Auth.Persistence.SESSION).then(() => {
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
              setState({
                userId: user.uid,
                username,
                loggedIn: true,
                message: '',
                firebaseErr: false,
              });
              user.updateProfile({
                displayName: username,
              });
              user
                .sendEmailVerification()
                .then(() => {
                  setState({
                    message: '',
                    firebaseErr: false,
                  });
                })
                .catch(() => {
                  setState({
                    firebaseErr: true,
                    message: 'Problem z wysłaniem wiadomości na adres email.',
                  });
                  setTimeout(() => {
                    setState({ firebaseErr: false, message: '' });
                  }, 4000);
                });
            })
            .catch(({ code }) => {
              setState({
                message: translateError(code),
                firebaseErr: true,
              });
              setTimeout(() => {
                setState({ firebaseErr: false, message: '' });
              }, 4000);
            });
        });
      } else {
        setState({
          message: 'Hasła nie są takie same.',
          firebaseErr: true,
        });
        setTimeout(() => {
          setState({ firebaseErr: false, message: '' });
        }, 4000);
      }
    },
    loginUser: ({ email: loginEmail, password }) => ({ setState }) => {
      auth.setPersistence(authentication.Auth.Persistence.SESSION).then(() => {
        return auth
          .signInWithEmailAndPassword(loginEmail, password)
          .then(({ user }) => {
            const { uid, displayName, email } = user;
            setState({
              userId: uid,
              username: displayName,
              email,
              loggedIn: true,
              firebaseErr: false,
              message: '',
            });
          })
          .catch(({ code }) => {
            setState({ firebaseErr: true, message: translateError(code) });
            setTimeout(() => {
              setState({ firebaseErr: false, message: '' });
            }, 4000);
          });
      });
    },
    logoutUser: () => ({ setState }) => {
      auth
        .signOut()
        .then(() => {
          setState({
            userId: '',
            username: '',
            email: '',
            message: 'Wylogowano pomyślnie.',
            loggedIn: false,
            loggedOut: true,
          });
        })
        .catch(() =>
          setState({
            firebaseErr: true,
            message: 'Nastąpił problem z wylogowaniem. Spróbuj ponownie później.',
          })
        );
      setTimeout(() => {
        setState({
          firebaseErr: false,
          loggedOut: false,
          message: '',
        });
      }, 4000);
    },
    resetPassword: (email) => ({ setState }) => {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          setState({
            emailSent: true,
            message: 'Wysłano wiadomość z resetowaniem hasła.',
          });
        })
        .catch(() => {
          setState({
            firebaseErr: true,
            message: 'Nastąpił problem z resetowaniem hasła. Spróbuj ponownie później.',
          });
        });
      setTimeout(() => {
        setState({
          firebaseErr: false,
          message: '',
        });
      }, 4000);
    },
    changeUserData: ({ username = null, email = null, password = null }) => ({ setState }) => {
      if (email) {
        auth.currentUser
          .verifyBeforeUpdateEmail(email)
          .then(() => {
            setState({
              email,
              emailSent: true,
              message: 'Potwierdź zmianę na nowym adresie email.',
              firebaseErr: false,
            });
          })
          .catch(({ code }) => {
            if (code) {
              setState({
                firebaseErr: true,
                message: translateError(code),
              });
            } else {
              setState({
                firebaseErr: true,
                message:
                  'Nie udało się zaaktualizować adresu email. Sprawdź czy podajesz prawidłowy adres.',
                emailSent: false,
              });
            }
          });
      } else if (username) {
        auth.currentUser
          .updateProfile({
            displayName: username,
          })
          .then(() => {
            setState({
              username,
              firebaseErr: false,
              message: '',
            });
          })
          .catch(({ code }) => {
            if (code) {
              setState({
                firebaseErr: true,
                message: translateError(code),
              });
            } else {
              setState({
                firebaseErr: true,
                message:
                  'Nie udało się zaaktualizować nazwy użytkownika. Spróbuj ponownie później.',
              });
            }
          });
      } else if (password) {
        auth.currentUser
          .updatePassword(password)
          .then(setState({ passChanged: true, firebaseErr: false, message: '' }))
          .catch(({ code }) => {
            if (code) {
              setState({
                message: translateError(code),
              });
            } else {
              setState({
                message: 'Nie udało się zaaktualizować hasła. Spróbuj ponownie później.',
              });
            }
            setState({
              passChanged: false,
              firebaseErr: true,
            });
          });
      }
      setTimeout(() => {
        setState({
          passChanged: false,
          emailSent: false,
          firebaseErr: false,
          message: '',
        });
      }, 4000);
    },
    deleteUser: () => ({ setState }) => {
      auth.currentUser
        .delete()
        .then(() => {
          setState({
            firebasErr: false,
            userDel: true,
            message: 'Usunięcie użytkownika zakończone sukcesem.',
          });
        })
        .catch(() => {
          setState({
            userDel: false,
            firebaseErr: true,
            message: 'Nie udało się usunąć użytkownika. Spróbuj ponownie później',
          });
        });
      setTimeout(() => {
        setState({
          userdel: false,
          firebaseErr: false,
          message: '',
        });
      }, 4000);
    },
    closeInfoModal: (e) => ({ setState }) => {
      if (e.target) {
        e.target.style.opacity = 0;
      } else {
        e.style.opacity = 0;
      }
      setTimeout(() => {
        setState({
          loggedOut: false,
          firebaseErr: false,
          emailSent: false,
          passChanged: false,
          userDel: false,
          message: '',
        });
      }, 300);
    },
    refillData: ({ uid, displayName, email }) => ({ setState }) => {
      setState({ userId: uid, username: displayName, email, loggedIn: true });
    },
    checkVerificationEmail: (emailVerified) => ({ setState }) => {
      if (!emailVerified) {
        setState({
          firebaseErr: true,
          message: 'Proszę potwierdzić adres email.',
        });
        return false;
      }
      setState({
        firebaseErr: false,
        message: '',
      });
      return true;
    },
    resetUser: () => ({ setState }) => {
      setState({
        loggedIn: false,
        loggedOut: false,
        firebaseErr: false,
      });
    },
  },
  name: 'user',
});

const tasksStore = createStore({
  initialState: {
    tasks: [],
    firebaseErr: false,
    message: '',
  },
  actions: {
    fetchTasks: (userId) => ({ setState }) => {
      database.ref('tasks/').on('value', (snap) => {
        const tasksList = Object.entries(snap.val()).filter(
          ([, { authorId }]) => userId === authorId
        );
        const tasks = tasksList
          .map(([taskId, content]) => {
            content.taskId = taskId;
            return content;
          })
          .flat();
        if (!tasks) {
          setState({
            tasks: false,
          });
        } else {
          setState({
            tasks,
          });
        }
      });
    },
    addTask: (newTask) => ({ setState, getState }) => {
      setState({
        tasks: [...getState().tasks, newTask],
      });
      const { taskId, authorId, title, content, date } = newTask;
      database.ref(`tasks/${taskId}`).set({ authorId, title, content, date }, (err) => {
        if (err) {
          setState({ firebaseErr: true, message: 'Wystąpił błąd podczas dodawania zadania.' });
        } else {
          setState({ firebaseErr: false, message: '' });
        }
      });
    },
    deleteTask: (id) => ({ setState, getState }) => {
      setState({
        tasks: [...getState().tasks.filter(({ taskId }) => taskId !== id)],
      });
      database.ref(`tasks/${id}`).remove();
    },
    editTask: ({ taskId, title, content }) => ({ setState, getState }) => {
      const newList = getState().tasks.map((task) => {
        if (task.taskId === taskId) {
          const updatedTask = {
            ...task,
            title,
            content,
          };
          return updatedTask;
        }
        return task;
      });
      setState({ tasks: [...newList] });
      database.ref(`tasks/${taskId}`).update(
        {
          title,
          content,
        },
        (err) => {
          if (err) {
            setState({ firebaseErr: true, message: 'Wystąpił błąd podczas edytowania zadania.' });
          } else {
            setState({ firebaseErr: false, message: '' });
          }
        }
      );
    },
    resetTasks: () => ({ setState }) => {
      setState({ tasks: [], firebaseErr: '', message: '' });
    },
  },
  name: 'tasks',
});

export const useUser = createHook(userStore);
export const useTasks = createHook(tasksStore);
