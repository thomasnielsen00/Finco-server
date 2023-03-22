import pool from "./mysql-pool";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export type User = {
  user_id: number;
  full_name: string;
  email: string;
  password: string;
  phone_number: string;
  savings_from: number;
  savings_to: number;
  risk_willingness: string;
};

export type Investment = {
  investment_id: number;
  amount: number;
  buy_price: number;
  buy_date: Date;
  sell_date: Date;
  user_id: number;
  company_id: number;
  company_name: string;
};

export type Industry = {
  user_id: number;
  industry_id: number;
  industry_name: string;
};

class UserService {
  /**
   * Get all users.
   */
  getAllUsers() {
    return new Promise<User[]>((resolve, reject) => {
      pool.query(
        "SELECT * FROM user",
        [],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as User[]);
        }
      );
    });
  }
  /**
   * Get user with given id.
   */
  getUser(user_id: number) {
    return new Promise<User | undefined>((resolve, reject) => {
      pool.query(
        "SELECT * FROM user WHERE user_id = ?",
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as User);
        }
      );
    });
  }

  /**
   * Get user with given email and password
   */
  signInUser(email: string) {
    return new Promise<User>((resolve, reject) => {
      pool.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as User);
        }
      );
    });
  }

  /**
   * Check if e-mail exists
   */
  emailCheck(email: string) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);
          if (results.length != 0) reject("E-mail in use");

          resolve();
        }
      );
    });
  }
  /**
   * Create new user having the given username, password, email, risk_willingness, monthly_savings_amount.
   *
   * Resolves the newly created users user_id.
   */
  createUser(full_name: string, email: string, password: string) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        "INSERT INTO user SET full_name=?, email=?, password=?, phone_number=? ,risk_willingness=?, savings_from=?, savings_to=?",
        [full_name, email, password, "Not selected", "Not selected", 0, 0],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        }
      );
    });
  }

  /**
   * Updates a user with given user_id.
   */
  updateUser(user: User) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "UPDATE user SET full_name=?, email=?, password=?, phone_number=?, savings_from=?, savings_to=?, risk_willingness=? WHERE user_id=?",
        [
          user.full_name,
          user.email,
          user.password,
          user.phone_number,
          user.savings_from,
          user.savings_to,
          user.risk_willingness,
          user.user_id,
        ],
        (error, _results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  /**
   * Delete user with given user_id.
   */
  deleteUser(user_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "DELETE FROM user WHERE user_id = ?",
        [user_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) reject(new Error("No row deleted"));

          resolve();
        }
      );
    });
  }

  //--------------------------------------------------------------------------------------------------------------------------------------
  //INVESTMENTS:
  //--------------------------------------------------------------------------------------------------------------------------------------

  //I BEGGE GET-METODENE UNDER BØR JEG KANSKJE OGSÅ HENTE UT
  //SELVE NAVNET PÅ INVESTERINGSVIRKSOMHETEN GJENNOM EN JOIN:

  /**
   * Get all investments for a given user.
   */
  getAllUserInvestments(user_id: number) {
    return new Promise<Investment[]>((resolve, reject) => {
      pool.query(
        "SELECT * FROM investment, company WHERE company.company_id = investment.company_id AND user_id=? AND sell_date IS NULL",
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Investment[]);
        }
      );
    });
  }

  /**
   * Get an investment for a given user with a given investment_id.
   */
  getUserInvestment(user_id: number, investment_id: number) {
    return new Promise<Investment | undefined>((resolve, reject) => {
      pool.query(
        "SELECT * FROM investment WHERE user_id=? AND investment_id=? AND sell_date IS NULL",
        [user_id, investment_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Investment);
        }
      );
    });
  }

  /**
   * Create new investment for a given user having the following attributes: username, password, email, risk_willingness, monthly_savings_amount.
   *
   * Resolves the newly created users id.
   */
  createUserInvestment(
    amount: number,
    buy_price: number,
    buy_date: string,
    user_id: number,
    company_id: number
  ) {
    return new Promise<number>((resolve, reject) => {
      pool.query(
        "INSERT INTO investment SET amount=?, buy_price=?, buy_date=?, user_id=?, company_id=?",
        [amount, buy_price, buy_date, user_id, company_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        }
      );
    });
  }

  /**
   * Updates a user-investment with given investment-id.
   */

  updateSoldUserInvestment(
    sell_date: string,
    user_id: number,
    investment_id: number
  ) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "UPDATE investment SET sell_date=? WHERE user_id=? AND investment_id=?",
        [sell_date, user_id, investment_id],
        (error, _results) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  /**
   * Delete a user-investment with given investment_id.
   */
  deleteUserInvestment(investment_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "DELETE FROM investment WHERE investment_id = ?",
        [investment_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) reject(new Error("No row deleted"));

          resolve();
        }
      );
    });
  }

  //------------------------------------------------------------------------------
  //         USER-PREFERED-INDUSTRY
  //------------------------------------------------------------------------------

  /**
   * Get all industries prefered by a given users.
   */
  getAllPreferedIndustries(user_id: number) {
    return new Promise<Industry[]>((resolve, reject) => {
      pool.query(
        "SELECT * FROM prefered_industry, industry WHERE prefered_industry.industry_id = industry.industry_id AND user_id=? ",
        [user_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Industry[]);
        }
      );
    });
  }

  /**
   * Get a prefered industry for a given user.
   */
  getPreferedIndustry(user_id: number, industry_id: number) {
    return new Promise<Industry | undefined>((resolve, reject) => {
      pool.query(
        "SELECT * FROM prefered_industry, industry WHERE prefered_industry.industry_id = industry.industry_id AND prefered_industry.user_id = ? AND prefered_industry.industry_id=?",
        [user_id, industry_id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Industry);
        }
      );
    });
  }

  /**
   * Get a all industries regardless of a user.
   */
  getAllIndustries() {
    return new Promise<Industry[]>((resolve, reject) => {
      pool.query(
        "SELECT * FROM industry ",
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Industry[]);
        }
      );
    });
  }

  createNewPreferedIndustry(user_id: number, industry_name: string) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        `INSERT INTO prefered_industry (user_id, industry_id)
        SELECT ?, (SELECT industry_id FROM industry WHERE industry_name = ?)
        WHERE NOT EXISTS (
          SELECT 1 FROM prefered_industry WHERE user_id = ? AND industry_id = (SELECT industry_id FROM industry WHERE industry_name = ?)
        )`,
        [user_id, industry_name, user_id, industry_name],
        (error, _results) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  /**
   * Update a prefered industry for a given user.
   */
  // updatePreferedIndustry(industry: Industry) {
  //   return new Promise<void>((resolve, reject) => {
  //     pool.query(
  //       'UPDATE prefered_industry SET prefered_industry.industry_id=(SELECT industry_id FROM industry WHERE industry_name=?) WHERE prefered_industry.user_id=? AND prefered_industry.industry_id=?',
  //       [industry.industry_name, industry.user_id, industry.industry_id],
  //       (error, _results) => {
  //         if (error) return reject(error);

  //         resolve();
  //       }
  //     );
  //   });
  // }

  //BURDEN DENNE SKRIVES OM SLIK AT MAN KAN SLETTE PÅ BAKGRUNN AV INDUSTRY_NAME PÅ SAMME MÅTE SOM DEN OVER?
  /**
   * Delete a prefered industry for a given user.
   */
  deletePreferedIndustry(industry_id: number, user_id: number) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "DELETE FROM prefered_industry WHERE prefered_industry.industry_id=? AND prefered_industry.user_id=?",
        //'DELETE FROM prefered_industry WHERE prefered_industry.industry_id=(SELECT industry_id FROM industry WHERE industry_name=?) AND prefered_industry.user_id=?',
        [industry_id, user_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) reject(new Error("No row deleted"));

          resolve();
        }
      );
    });
  }
}

const userService = new UserService();
export default userService;
