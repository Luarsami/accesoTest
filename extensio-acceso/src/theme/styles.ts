// src/theme/styles.ts
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2196F3',
  background: '#ffffff',
  text: '#000000',
  buttonText: '#ffffff',
};

export const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
};

// ✅ convertimos a StyleSheet.create para tipado seguro
export const typography = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.lg + spacing.md,
  },
  buttonText: {
    fontSize: 18,
    color: colors.buttonText,
  },
});


export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
    marginVertical: spacing.sm,
    width: '100%',
    alignItems: 'center',
  },
});
